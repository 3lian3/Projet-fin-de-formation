<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use App\Repository\LessonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LessonRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:lesson']],
    operations: [
        new Api\GetCollection(),
        new Api\Get(),
        new Api\Post(),
        new Api\Put(),
        new Api\Delete(),
    ]
)]
class Lesson
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:lesson'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups([
        'read:lesson',
        'read:grade',
        'read:exam',
    ])]
    private ?string $name = null;

    /**
     * @var Collection<int, AttendanceTeacher>
     */
    #[ORM\OneToMany(mappedBy: 'lesson', targetEntity: AttendanceTeacher::class, orphanRemoval: true)]
    private Collection $attendanceTeachers;

    #[ORM\OneToMany(mappedBy: 'lesson', targetEntity: Exam::class)]
    private Collection $exams;

    public function __construct()
    {
        $this->attendanceTeachers = new ArrayCollection();
        $this->exams = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, AttendanceTeacher>
     */
    public function getAttendanceTeachers(): Collection
    {
        return $this->attendanceTeachers;
    }

    public function addAttendanceTeacher(AttendanceTeacher $attendanceTeacher): static
    {
        if (!$this->attendanceTeachers->contains($attendanceTeacher)) {
            $this->attendanceTeachers[] = $attendanceTeacher;
            $attendanceTeacher->setLesson($this);
        }

        return $this;
    }

    public function removeAttendanceTeacher(AttendanceTeacher $attendanceTeacher): static
    {
        // set the owning side to null (unless already changed)
        if ($this->attendanceTeachers->removeElement($attendanceTeacher) && $attendanceTeacher->getLesson() === $this) {
            $attendanceTeacher->setLesson(null);
        }

        return $this;
    }

    /**
     * @return Collection<int, Exam>
     */
    public function getExams(): Collection
    {
        return $this->exams;
    }

    public function addExam(Exam $exam): static
    {
        if (!$this->exams->contains($exam)) {
            $this->exams->add($exam);
            $exam->setLesson($this);
        }

        return $this;
    }

    public function removeExam(Exam $exam): static
    {
        // set the owning side to null (unless already changed)
        if ($this->exams->removeElement($exam) && $exam->getLesson() === $this) {
            $exam->setLesson(null);
        }

        return $this;
    }
}
