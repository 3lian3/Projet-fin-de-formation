<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\StudentFile;
use Gaufrette\Filesystem;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class StudentPdfDownloadAction extends AbstractController
{
    public function __invoke(StudentFile $studentFile, Filesystem $studentsFilesystem): Response
    {
        $file = $studentsFilesystem->read((string) $studentFile->getPath());

        $response = new Response($file);
        $response->headers->set('Content-Type', 'application/pdf');
        $response->headers->set('Content-Disposition', HeaderUtils::makeDisposition(
            HeaderUtils::DISPOSITION_ATTACHMENT,
            $studentFile->getPath().'.pdf'
        ));

        return $response;
    }
}
