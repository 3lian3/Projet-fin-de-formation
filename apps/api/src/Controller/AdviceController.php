<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Advice;
use App\Entity\User;
use App\Repository\AdviceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class AdviceController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private AdviceRepository $adviceRepository;
    private TokenStorageInterface $token;

    public function __construct(EntityManagerInterface $entityManager, AdviceRepository $adviceRepository, TokenStorageInterface $token)
    {
        $this->entityManager = $entityManager;
        $this->adviceRepository = $adviceRepository;
        $this->token = $token;
    }

    #[Route('/submit-advice', methods: ['POST'])]
    public function __invoke(Request $request): Response
    {
        $token = $this->token->getToken();
        if (!$token instanceof \Symfony\Component\Security\Core\Authentication\Token\TokenInterface) {
            return new JsonResponse(['message' => 'Token non trouvé.'], Response::HTTP_UNAUTHORIZED);
        }

        $user = $token->getUser();
        if (!$user instanceof User || !$user->getStudent()) {
            return new JsonResponse(['message' => 'Vous devez être connecter pour pouvoir remplir le questionnaire.'], Response::HTTP_FORBIDDEN);
        }

        $student = $user->getStudent();

        if ($this->adviceRepository->hasSubmittedThisWeek($student)) {
            return new JsonResponse(['message' => 'Vous avez déjà rempli le questionnaire cette semaine.'], Response::HTTP_FORBIDDEN);
        }

        $data = json_decode($request->getContent(), true);
        if (!is_array($data)) {
            return new JsonResponse(['message' => 'Données invalides.'], Response::HTTP_BAD_REQUEST);
        }
        $advice = new Advice();
        $advice->setStudent($student);
        $advice->setQuestion1($data['question1'] ?? null);
        $advice->setQuestion2($data['question2'] ?? null);
        $advice->setQuestion3($data['question3'] ?? null);
        $advice->setQuestion4($data['question4'] ?? null);
        $advice->setQuestion5($data['question5'] ?? null);
        $advice->setFeedback($data['feedback'] ?? null);

        $this->entityManager->persist($advice);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'questionnaire soumis avec succès.'], Response::HTTP_CREATED);
    }
}
