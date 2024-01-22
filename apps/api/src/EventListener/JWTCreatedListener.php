<?php

declare(strict_types=1);

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        /** @var UserInterface $user */
        $user = $event->getUser();

        if (method_exists($user, 'getId')) {
            $payload = $event->getData();
            $payload['id'] = $user->getId();
            $event->setData($payload);
        }
    }
}
