<?php

declare(strict_types=1);

namespace App\EventListener;

use App\Entity\Advice;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: Advice::class)]
class EntityAdviceListener
{
    private TokenStorageInterface $token;

    public function __construct(TokenStorageInterface $token)
    {
        $this->token = $token;
    }

    public function prePersist(Advice $advice): void
    {
        $token = $this->token->getToken();

        if (!$token instanceof \Symfony\Component\Security\Core\Authentication\Token\TokenInterface) {
            return;
        }

        $user = $token->getUser();
        if (!$user instanceof User || !$user->getStudent()) {
            return;
        }

        $student = $user->getStudent();

        if ($advice instanceof Advice) {
            $advice->setStudent($student);
        }
    }
}
