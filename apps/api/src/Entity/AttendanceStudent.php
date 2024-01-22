<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata as Api;
use App\Repository\AttendanceStudentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AttendanceStudentRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:attendanceStudent']],
    denormalizationContext: ['groups' => ['write:attendanceStudent']],
    security: 'is_granted("ROLE_ADMIN") or is_granted("ROLE_STUDENT")',
    operations: [
        new Api\Get(),
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Put(
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Api\Delete(
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Api\Patch(
            security: 'is_granted("ROLE_ADMIN")'
        ),
    ]
)]
#[Api\ApiFilter(SearchFilter::class, properties: ['date' => 'exact', 'student' => 'exact'])]
#[UniqueEntity(
    fields: ['student', 'date'],
    errorPath: 'date',
    message: 'Un étudiant ne peut s\'enregistrer qu\'une fois par jour.'
)]
#[UniqueConstraint(name: 'student_date', columns: ['student_id', 'date'])]
class AttendanceStudent
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['read:attendanceStudent'])]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['read:attendanceStudent'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:attendanceStudent', 'write:attendanceStudent'])]
    private ?string $morning = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:attendanceStudent', 'write:attendanceStudent'])]
    private ?string $afternoon = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read:attendanceStudent', 'write:attendanceStudent'])]
    private ?string $proofOfAbsence = null;

    #[ORM\ManyToOne(inversedBy: 'attendanceStudents')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:attendanceStudent', 'read:attendanceSummary'])]
    private ?Student $student = null;

    public function __construct()
    {
        $this->date = new \DateTime();
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

    public function getMorning(): ?string
    {
        return $this->morning;
    }

    public function setMorning(string $morning): static
    {
        $this->morning = $morning;

        return $this;
    }

    public function getAfternoon(): ?string
    {
        return $this->afternoon;
    }

    public function setAfternoon(string $afternoon): static
    {
        $this->afternoon = $afternoon;

        return $this;
    }

    public function getProofOfAbsence(): ?string
    {
        return $this->proofOfAbsence;
    }

    public function setProofOfAbsence(?string $proofOfAbsence): static
    {
        $this->proofOfAbsence = $proofOfAbsence;

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

    #[Groups(['read:attendanceStudent'])]
    public function getStudentId(): ?int
    {
        return $this->student instanceof Student ? $this->student->getId() : null;
    }
}
