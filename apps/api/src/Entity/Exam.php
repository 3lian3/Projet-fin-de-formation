<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use App\Repository\ExamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ExamRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:exam']],
    denormalizationContext: ['groups' => ['write:exam']],
    operations: [
        new Api\Get(),
        new Api\Post(),
        new Api\Patch(),
        new Api\Delete(),
        new Api\Put(),
        new Api\GetCollection(),
    ],
)]
class Exam
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:exam'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['read:exam', 'write:exam'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:exam', 'write:exam', 'read:grade', 'read: student'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'exams')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'read:exam',
        'write:exam',
    ])]
    private ?Promotion $promotion = null;

    #[ORM\ManyToOne(inversedBy: 'exams')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:exam', 'write:exam'])]
    private ?Lesson $lesson = null;

    #[ORM\OneToMany(mappedBy: 'exam', targetEntity: Grade::class)]
    private Collection $grades;

    public function __construct()
    {
        $this->grades = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPromotion(): ?Promotion
    {
        return $this->promotion;
    }

    public function setPromotion(?Promotion $promotion): static
    {
        $this->promotion = $promotion;

        return $this;
    }

    public function getLesson(): ?Lesson
    {
        return $this->lesson;
    }

    public function setLesson(?Lesson $lesson): static
    {
        $this->lesson = $lesson;

        return $this;
    }

    /**
     * @return Collection<int, Grade>
     */
    public function getGrades(): Collection
    {
        return $this->grades;
    }

    public function addGrade(Grade $grade): static
    {
        if (!$this->grades->contains($grade)) {
            $this->grades->add($grade);
            $grade->setExam($this);
        }

        return $this;
    }

    public function removeGrade(Grade $grade): static
    {
        // set the owning side to null (unless already changed)
        if ($this->grades->removeElement($grade) && $grade->getExam() === $this) {
            $grade->setExam(null);
        }

        return $this;
    }
}
