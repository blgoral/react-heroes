<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\HeroAbilityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=HeroAbilityRepository::class)
 */
class HeroAbility
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"hero:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"hero:read"})
     */
    private $abilityName;

    /**
     * @ORM\Column(type="integer")
     */
    private $abilityPower;

    /**
     * @ORM\ManyToMany(targetEntity=Hero::class, mappedBy="abilities")
     */
    private $heroes;

    public function __construct()
    {
        $this->heroes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAbilityName(): ?string
    {
        return $this->abilityName;
    }

    public function setAbilityName(string $abilityName): self
    {
        $this->abilityName = $abilityName;

        return $this;
    }

    public function getAbilityPower(): ?int
    {
        return $this->abilityPower;
    }

    public function setAbilityPower(int $abilityPower): self
    {
        $this->abilityPower = $abilityPower;

        return $this;
    }

    /**
     * @return Collection|Hero[]
     */
    public function getHeroes(): Collection
    {
        return $this->heroes;
    }

    public function addHero(Hero $hero): self
    {
        if (!$this->heroes->contains($hero)) {
            $this->heroes[] = $hero;
            $hero->addAbility($this);
        }

        return $this;
    }

    public function removeHero(Hero $hero): self
    {
        if ($this->heroes->removeElement($hero)) {
            $hero->removeAbility($this);
        }

        return $this;
    }
}
