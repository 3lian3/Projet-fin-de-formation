<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata as Api;
use ApiPlatform\OpenApi\Model;
use App\Controller\GradeByPromotionController;
use App\Repository\GradeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GradeRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:grade']],
    denormalizationContext: ['groups' => ['write:grade']],
    operations: [
        new Api\Get(),
        new Api\Post(),
        new Api\Patch(),
        new Api\Delete(),
        new Api\Put(),
        new Api\GetCollection(),
        new Api\Get(
            uriTemplate: '/promotions/{promotionId}/grades',
            controller: GradeByPromotionController::class,
            normalizationContext: ['groups' => ['read:studentGrades']],
            read: false,
            // security: 'is_granted("ROLE_STUDENT")',
            openapi: new Model\Operation(
                summary: 'Get grades by student'
            )
        ),
    ],
)]
#[Api\ApiFilter(SearchFilter::class, properties: ['student' => 'exact'])]
#[Api\ApiFilter(SearchFilter::class, properties: ['student.user.lastname' => 'ipartial', 'student.user.firstname' => 'ipartial', 'student.promotion.id' => 'ipartial'])]
#[UniqueConstraint(name: 'student_exam', columns: ['student_id', 'exam_id'])]
class Grade
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:grade'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['read:grade', 'write:grade', 'read: studentGrades'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::INTEGER, nullable: true)]
    #[Groups(['read:grade', 'write:grade', 'read: studentGrades'])]
    private ?int $grade = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['read:grade', 'write:grade', 'read: studentGrades'])]
    private ?string $appreciation = null;

    #[ORM\ManyToOne(inversedBy: 'grades')]
    #[ORM\JoinColumn(name: 'student_id', referencedColumnName: 'id')]
    #[Groups(['read:grade', 'write:grade', 'read: studentGrades'])]
    private ?Student $student = null;

    #[ORM\ManyToOne(inversedBy: 'grades')]
    #[ORM\JoinColumn(name: 'exam_id', referencedColumnName: 'id', nullable: false)]
    #[Groups(['read:grade', 'write:grade'])]
    private ?Exam $exam = null;

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

    public function getGrade(): ?int
    {
        return $this->grade;
    }

    public function setGrade(int $grade): static
    {
        $this->grade = $grade;

        return $this;
    }

    public function getAppreciation(): ?string
    {
        return $this->appreciation;
    }

    public function setAppreciation(?string $appreciation): static
    {
        $this->appreciation = $appreciation;

        return $this;
    }

    public function getStudent(): ?Student
    {
        return $this->student;
    }

    public function setStudent(?Student $student): static
    {
        $this->student = $student;

        return $this;
    }

    public function getExam(): ?Exam
    {
        return $this->exam;
    }

    public function setExam(?Exam $exam): static
    {
        $this->exam = $exam;

        return $this;
    }

    #[Groups(['read:grade'])]
    public function getFirstname(): ?string
    {
        if (null !== $this->student) {
            $user = $this->student->getUser();
            if (null !== $user) {
                return $user->getFirstname();
            }
        }

        return null;
    }

    #[Groups(['read:grade'])]
    public function getLastname(): ?string
    {
        if (null !== $this->student) {
            $user = $this->student->getUser();
            if (null !== $user) {
                return $user->getLastname();
            }
        }

        return null;
    }
}
