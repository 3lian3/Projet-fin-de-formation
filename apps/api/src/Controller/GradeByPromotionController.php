<?php

declare(strict_types=1);

namespace App\Controller;

use App\Repository\GradeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class GradeByPromotionController extends AbstractController
{
    private GradeRepository $gradeRepository;

    public function __construct(GradeRepository $gradeRepository)
    {
        $this->gradeRepository = $gradeRepository;
    }

    #[Route('/promotions/{promotionId}/grades', name: 'get_promotion_grades', methods: ['GET'])]
    public function __invoke(int $promotionId): Response
    {
        $grades = $this->gradeRepository->findGradesByPromotion($promotionId);

        if (!$grades) {
            throw $this->createNotFoundException('Aucune note trouvée pour cette promotion.');
        }

        return $this->json($grades, Response::HTTP_OK, [], ['groups' => ['read:grade']]);
    }
}
