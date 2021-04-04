<?php

namespace App\DataFixtures;

use App\Entity\Hero;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $hero = new Hero();

        $hero->setName('Test Hero')
            ->setLevel(rand(1, 100));

        $manager->persist($hero);

        $manager->flush();
    }
}
