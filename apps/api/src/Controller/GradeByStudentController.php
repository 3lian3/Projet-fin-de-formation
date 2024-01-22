<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\GradeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class GradeByStudentController extends AbstractController
{
    private GradeRepository $gradeRepository;

    public function __construct(GradeRepository $gradeRepository)
    {
        $this->gradeRepository = $gradeRepository;
    }

    #[Route('grades/student/{studentId}', name: 'grade_by_student', methods: ['GET'])]
    public function __invoke(int $studentId): Response
    {
        $students = $this->gradeRepository->findGradesByStudent($studentId);

        if (!$students) {
            throw $this->createNotFoundException('Aucune note trouvée pour cet étudiant');
        }

        return $this->json($students, Response::HTTP_OK, [], ['groups' => ['read:student']]);
    }
}
