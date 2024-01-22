<?php

declare(strict_types=1);

namespace App\EventListener;

use App\Entity\Student;
use App\Entity\User;
use App\Service\EmailService;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: Student::class)]
#[AsEntityListener(event: Events::postUpdate, method: 'postUpdate', entity: Student::class)]
#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: Student::class)]
class EntityStudentListener
{
    public function __construct(
        private ResetPasswordHelperInterface $resetPasswordHelper,
        private EmailService $emailService,
    ) {
    }

    public function postPersist(Student $student): void
    {
        if ('Inscrit' === $student->getState()) {
            $this->sendWelcomeEmail($student);
        }
    }

    public function preUpdate(Student $student, PreUpdateEventArgs $event): void
    {
        if (
            'Inscrit' == $student->getState()
            && $event->hasChangedField('state')
            && 'Inscrit' !== $event->getOldValue('state')) {
            $student->needToSendWelcomeEmail = true;
        }
    }

    public function postUpdate(Student $student): void
    {
        if ($student->needToSendWelcomeEmail) {
            $student->needToSendWelcomeEmail = false;
            $this->sendWelcomeEmail($student);
        }
    }

    private function sendWelcomeEmail(Student $student): void
    {
        if ($student->getUser() instanceof User) {
            // $this->resetPasswordService->sendResetPasswordEmail($student->getUser());
            $resetToken = $this->resetPasswordHelper->generateResetToken($student->getUser());

            $this->emailService->sendEmail(
                'admin@gmail.com',
                $student->getUser()->getEmail(),
                [
                    'resetToken' => $resetToken,
                ]
            );
        }
    }
}
