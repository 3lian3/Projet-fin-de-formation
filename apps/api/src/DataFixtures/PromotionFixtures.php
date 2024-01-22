<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Promotion;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PromotionFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $this->loadPromotion($manager);
    }

    public function loadPromotion(ObjectManager $manager): void
    {
        $promotion = new Promotion();
        $promotion->setName('PromoJanv 2024')
                    ->setStartDate(new \DateTime('2024-01-08'))
                    ->setEndDate(new \DateTime('2024-02-08'));
        $manager->persist($promotion);

        $promotion = new Promotion();
        $promotion->setName('PromoFev 2024')
                    ->setStartDate(new \DateTime('2024-02-08'))
                    ->setEndDate(new \DateTime('2024-03-08'));
        $manager->persist($promotion);

        $promotion = new Promotion();
        $promotion->setName('PromoMars 2024')
                    ->setStartDate(new \DateTime('2024-03-08'))
                    ->setEndDate(new \DateTime('2024-04-08'));
        $manager->persist($promotion);

        $promotion = new Promotion();
        $promotion->setName('PromoAvr 2024')
                    ->setStartDate(new \DateTime('2024-04-08'))
                    ->setEndDate(new \DateTime('2024-05-08'));
        $manager->persist($promotion);

        $promotion = new Promotion();
        $promotion->setName('PromoMai 2024')
                    ->setStartDate(new \DateTime('2024-05-08'))
                    ->setEndDate(new \DateTime('2024-06-08'));
        $manager->persist($promotion);

        $manager->flush();
    }
}
