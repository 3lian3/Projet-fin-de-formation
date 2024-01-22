<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\EmailService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

#[AsController]
class AskResetPasswordAction extends AbstractController
{
    public function __construct(private ResetPasswordHelperInterface $resetPasswordHelper, private UserRepository $userRepository, private EmailService $emailService)
    {
    }

    public function __invoke(User $data): JsonResponse
    {
        /** @var ?User */
        $user = $this->userRepository->findOneBy(['email' => $data->getEmail()]);

        if (null === $user) {
            return new JsonResponse(['message' => 'User not found!'], Response::HTTP_NOT_FOUND);
        }

        // $this->resetPasswordService->sendResetPasswordEmail($user);
        $resetToken = $this->resetPasswordHelper->generateResetToken($user);

        $this->emailService->sendAskPassEmail(
            'admin@gmail.com',
            $user->getEmail(),
            [
                'resetToken' => $resetToken,
            ]
        );

        return new JsonResponse(['message' => 'Password reset!']);
    }
}
