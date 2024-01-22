<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Lesson;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class LessonFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $this->loadLesson($manager);
    }

    public function loadLesson(ObjectManager $manager): void
    {
        $lesson = new Lesson();
        $lesson->setName('marketing');
        $manager->persist($lesson);

        $lesson = new Lesson();
        $lesson->setName('finance');
        $manager->persist($lesson);

        $lesson = new Lesson();
        $lesson->setName('droit du commerce');
        $manager->persist($lesson);

        $lesson = new Lesson();
        $lesson->setName('vente et actions commerciales');
        $manager->persist($lesson);

        $lesson = new Lesson();
        $lesson->setName('gestion de projet');
        $manager->persist($lesson);

        $manager->flush();
    }
}
