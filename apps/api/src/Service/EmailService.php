<?php

declare(strict_types=1);

namespace App\Service;

use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;

class EmailService extends TemplatedEmail
{
    private MailerInterface $mailer;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * @param array<string, mixed> $context
     */
    public function sendEmail(
        string $from,
        ?string $to,
        array $context = []
    ): void {
        if (null === $to) {
            return;
        }

        $email = (new TemplatedEmail())
        ->from($from)
        ->to($to)
        ->subject('Première connexion à votre espace personnel')
        ->htmlTemplate('email.html.twig')
        ->context($context);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            // some error prevented the email sending; display an
            // error message or try to resend the message
        }
    }

    /**
     * @param array<string, mixed> $context
     */
    public function sendAskPassEmail(
        string $from,
        ?string $to,
        array $context = []
    ): void {
        if (null === $to) {
            return;
        }

        $email = (new TemplatedEmail())
        ->from($from)
        ->to($to)
        ->subject('Changement de mot de passe')
        ->htmlTemplate('askResetPasswordEmail.html.twig')
        ->context($context);

        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            // some error prevented the email sending; display an
            // error message or try to resend the message
        }
    }
}
