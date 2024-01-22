<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata as Api;
use App\Controller\GradeByPromotionController;
use App\Repository\PromotionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PromotionRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:Promotion']],
    denormalizationContext: ['groups' => ['write:Promotion']],
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
            read: false,
            openapiContext: [
                 'summary' => 'Get grades by promotion',
                 'parameters' => [
                      [
                           'name' => 'promotionId',
                           'in' => 'path',
                           'required' => true,
                           'schema' => [
                             'type' => 'integer',
                           ],
                      ],
                 ],
               ],
        ),
   ]
)]
class Promotion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:Promotion', 'read:student'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups([
        'read:Promotion',
        'write:Promotion',
        'read:student',
        'read:grade',
        'read:exam',
    ])]
    private ?string $name = null;

    #[ORM\Column(type: 'date')]
    #[Assert\NotBlank]
    #[Assert\GreaterThanOrEqual('today', message: "La date de début ne peut pas être antérieure à aujourd'hui.")]
    #[Groups(['read:Promotion', 'write:Promotion'])]
    private ?\DateTimeInterface $startDate = null;

    #[ORM\Column(type: 'date')]
    #[Assert\NotBlank]
    #[Assert\GreaterThan(propertyPath: 'startDate', message: 'La date de fin doit être postérieure à la date de début.')]
    #[Groups(['read:Promotion', 'write:Promotion'])]
    private ?\DateTimeInterface $endDate = null;

    /**
     * @var Collection<int, Student>
     */
    #[ORM\OneToMany(mappedBy: 'promotion', targetEntity: Student::class)]
    #[Groups(['read:Promotion'])]
    private Collection $students;

    /**
     * @var Collection<int, AttendanceTeacher>
     */
    #[ORM\OneToMany(mappedBy: 'promotion', targetEntity: AttendanceTeacher::class)]
    private Collection $attendanceTeachers;

    #[ORM\OneToMany(mappedBy: 'promotion', targetEntity: Exam::class)]
    private Collection $exams;

    public function __construct()
    {
        $this->students = new ArrayCollection();
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

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * @return Collection<int, AttendanceTeacher>
     */
    public function getAttendanceTeachers(): Collection
    {
        return $this->attendanceTeachers;
    }

    /**
     * @return Collection<int, Student>
     */
    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(Student $student): static
    {
        if (!$this->students->contains($student)) {
            $this->students->add($student);
            $student->setPromotion($this);
        }

        return $this;
    }

    public function addAttendanceTeacher(AttendanceTeacher $attendanceTeacher): static
    {
        if (!$this->attendanceTeachers->contains($attendanceTeacher)) {
            $this->attendanceTeachers[] = $attendanceTeacher;
            $attendanceTeacher->setPromotion($this);
        }

        return $this;
    }

    public function removeStudent(Student $student): static
    {
        // set the owning side to null (unless already changed)
        if ($this->students->removeElement($student) && $student->getPromotion() === $this) {
            $student->setPromotion(null);
        }

        return $this;
    }

    public function removeAttendanceTeacher(AttendanceTeacher $attendanceTeacher): static
    {
        // set the owning side to null (unless already changed)
        if ($this->attendanceTeachers->removeElement($attendanceTeacher) && $attendanceTeacher->getPromotion() === $this) {
            $attendanceTeacher->setPromotion(null);
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
            $exam->setPromotion($this);
        }

        return $this;
    }

    public function removeExam(Exam $exam): static
    {
        // set the owning side to null (unless already changed)
        if ($this->exams->removeElement($exam) && $exam->getPromotion() === $this) {
            $exam->setPromotion(null);
        }

        return $this;
    }
}
