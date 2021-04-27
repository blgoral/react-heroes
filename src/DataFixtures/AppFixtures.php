<?php

namespace App\DataFixtures;

use App\Entity\Hero;
use App\Entity\HeroAbility;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;

class AppFixtures extends Fixture
{
    /**
     * @var Generator
     */
    protected $faker;


    public function load(ObjectManager $manager)
    {
        $this->faker = Factory::create();

        $heroAbility = new HeroAbility();

        $heroAbility->setAbilityName("Basic Punch")->setAbilityPower(10);

        $manager->persist($heroAbility);

        for($i = 0; $i <= 10; $i++) {
            $hero = new Hero();

            $hero->setName($this->faker->firstName)
                ->setLevel(rand(1, 100));

            $hero->addAbility($heroAbility);

            $manager->persist($hero);
        }


        $manager->flush();
    }
}
