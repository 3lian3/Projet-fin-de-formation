<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Student;
use App\Entity\StudentFile;
use App\Service\PdfGeneratorService;
use Doctrine\ORM\EntityManagerInterface;
use Gaufrette\Filesystem;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class StudentPdfGeneratorAction extends AbstractController
{
    public function __construct(private PdfGeneratorService $pdfGeneratorService)
    {
    }

    public function __invoke(Request $request, Student $student, string $docType, Filesystem $studentsFilesystem, EntityManagerInterface $em): StudentFile|Response
    {
        $content = $this->pdfGeneratorService->generate($docType, [
            'student' => $student,
        ]);

        if ($request->get('preview')) {
            $response = new Response($content);
            $response->headers->set('Content-Disposition', HeaderUtils::makeDisposition(
                HeaderUtils::DISPOSITION_INLINE,
                $docType.'.pdf'
            ));
            $response->headers->set('Content-Type', 'application/pdf');

            return $response;
        }

        $path = $student->getFolder().date('Y-m-d').' - '.$docType.' - '.$student->getFullname().'.pdf';

        $studentsFilesystem->write($path, (string) $content, true);

        $file = new StudentFile();
        $file->setStudent($student);
        $file->setPath($path);
        $file->setDocType($docType);

        $em->persist($file);
        $em->flush();

        return $file;
    }
}
