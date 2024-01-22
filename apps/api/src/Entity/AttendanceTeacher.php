<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata as Api;
use App\Repository\AttendanceTeacherRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\UniqueConstraint;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AttendanceTeacherRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:attendanceTeacher']],
    denormalizationContext: ['groups' => ['write:attendanceTeacher']],
    operations: [
        new Api\Get(),
        new Api\GetCollection(),
        new Api\Post(
            security: 'is_granted("ROLE_ADMIN") or is_granted("ROLE_TEACHER")'
        ),
        new Api\Delete(
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Api\Patch(
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Api\Put(
            security: 'is_granted("ROLE_ADMIN")'
        ),
    ]
)]
#[Api\ApiFilter(SearchFilter::class, properties: ['date' => 'exact'])]
#[UniqueEntity(
    fields: ['user', 'date'],
    errorPath: 'date',
    message: 'Un professeur ne peut s\'enregistrer qu\'une fois par jour.'
)]
#[UniqueConstraint(name: 'user_date', columns: ['user_id', 'date'])]
class AttendanceTeacher
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:attendanceTeacher'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups([
        'read:attendanceTeacher',
        'read:attendanceSummary',
        ])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'read:attendanceTeacher',
        'write:attendanceTeacher',
        ])]
    private ?string $morning = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'read:attendanceTeacher',
        'write:attendanceTeacher',
        ])]
    private ?string $afternoon = null;

    #[ORM\ManyToOne(inversedBy: 'attendanceTeachers')]
    #[Groups([
        'read:attendanceTeacher',
        'write:attendanceTeacher',
        'read:attendanceSummary',
        ])]
    private ?Lesson $lesson = null;

    #[ORM\ManyToOne(inversedBy: 'attendanceTeachers')]
    #[Groups([
        'read:attendanceTeacher',
        'write:attendanceTeacher',
        'read:attendanceSummary',
        ])]
    private ?Promotion $promotion = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups([
        'read:attendanceTeacher',
        'write:attendanceTeacher',
        ])]
    private ?string $proofOfAbsence = null;

    #[ORM\ManyToOne(inversedBy: 'attendanceTeachers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'read:attendanceTeacher',
        'read:attendanceSummary',
        ])]
    private ?User $user = null;

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

    public function getLesson(): ?Lesson
    {
        return $this->lesson;
    }

    public function setLesson(?Lesson $lesson): static
    {
        $this->lesson = $lesson;

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

    public function getProofOfAbsence(): ?string
    {
        return $this->proofOfAbsence;
    }

    public function setProofOfAbsence(?string $proofOfAbsence): static
    {
        $this->proofOfAbsence = $proofOfAbsence;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
