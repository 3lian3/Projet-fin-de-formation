<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = \Faker\Factory::create('fr_FR');
        for ($i = 0; $i < 50; ++$i) {
            $user = new User();
            $user->setEmail($faker->email());
            $user->setPassword($this->passwordHasher->hashPassword(
                $user,
                'test1234'
            )
            );
            $user->setFirstName($faker->firstName());
            $user->setLastName($faker->lastName());
            $user->setRoles(['ROLE_STUDENT']);
            $manager->persist($user);
        }

        $user = new User();
        $user->setEmail('teacher@gmail.com');
        $user->setPassword($this->passwordHasher->hashPassword(
            $user,
            'teacher1234'
        ));
        $user->setFirstName('sophie');
        $user->setLastName('marie');
        $user->setRoles(['ROLE_TEACHER']);
        $manager->persist($user);

        $user = new User();
        $user->setEmail('admin@gmail.com');
        $user->setPassword($this->passwordHasher->hashPassword(
            $user,
            'admin1234'
        ));
        $user->setFirstName('Marc');
        $user->setLastName('Jean');
        $user->setRoles(['ROLE_ADMIN']);
        $manager->persist($user);

        $manager->flush();
    }
}
