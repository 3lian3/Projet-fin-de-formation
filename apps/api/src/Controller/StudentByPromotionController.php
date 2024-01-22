<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\StudentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StudentByPromotionController extends AbstractController
{
    private StudentRepository $studentRepository;

    public function __construct(StudentRepository $studentRepository)
    {
        $this->studentRepository = $studentRepository;
    }

    #[Route('/promotions/{promotionId}/students', name: 'get_promotion_students', methods: ['GET'])]
    public function __invoke(int $promotionId): Response
    {
        $students = $this->studentRepository->findStudentsByPromotion($promotionId);

        if ([] === $students) {
            throw $this->createNotFoundException('Aucun étudiant trouvé pour cette promotion.');
        }

        return $this->json($students, Response::HTTP_OK, [], ['groups' => ['read:student']]);
    }
}
