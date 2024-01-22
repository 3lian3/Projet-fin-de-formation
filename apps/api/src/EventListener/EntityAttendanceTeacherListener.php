<?php

declare(strict_types=1);

namespace App\EventListener;

use App\Entity\AttendanceTeacher;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: AttendanceTeacher::class)]
class EntityAttendanceTeacherListener
{
    private TokenStorageInterface $tokenStorage;
    private AuthorizationCheckerInterface $authChecker;

    public function __construct(TokenStorageInterface $tokenStorage, AuthorizationCheckerInterface $authChecker)
    {
        $this->tokenStorage = $tokenStorage;
        $this->authChecker = $authChecker;
    }

    public function prePersist(AttendanceTeacher $attendance): void
    {
        $token = $this->tokenStorage->getToken();
        if (!$token instanceof \Symfony\Component\Security\Core\Authentication\Token\TokenInterface) {
            return;
        }

        $user = $token->getUser();
        if (!$user instanceof User || !$user->getId()) {
            return;
        }

        if (!$this->authChecker->isGranted('ROLE_TEACHER', $user)) {
            return;
        }

        $attendance->setUser($user);
    }
}
