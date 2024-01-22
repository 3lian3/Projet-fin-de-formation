<?php

declare(strict_types=1);

namespace App\EventListener;

use App\Entity\AttendanceStudent;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Events;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: AttendanceStudent::class)]
class EntityAttendanceListener
{
    private TokenStorageInterface $token;

    public function __construct(TokenStorageInterface $token)
    {
        $this->token = $token;
    }

    public function prePersist(AttendanceStudent $attendance): void
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

        if ($attendance instanceof AttendanceStudent) {
            $attendance->setStudent($student);
        }
    }
}
