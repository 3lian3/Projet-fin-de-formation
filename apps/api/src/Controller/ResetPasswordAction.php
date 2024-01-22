<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

#[AsController]
class ResetPasswordAction extends AbstractController
{
    public function __construct(private ResetPasswordHelperInterface $resetPasswordHelper, private EntityManagerInterface $em)
    {
    }

    public function __invoke(User $data, string $hash): JsonResponse
    {
        /** @var User */
        $user = $this->resetPasswordHelper->validateTokenAndFetchUser($hash);
        $user->setPlainPassword($data->getPlainPassword());
        $this->em->flush();
        $this->resetPasswordHelper->removeResetRequest($hash);

        return new JsonResponse(['message' => 'Password reset!']);
    }
}
