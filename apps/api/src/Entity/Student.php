<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata as Api;
use ApiPlatform\OpenApi\Model;
use App\Controller\StudentImageController;
use App\Controller\StudentPdfGeneratorAction;
use App\Repository\StudentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Vich\UploaderBundle\Mapping\Annotation\UploadableField;

#[ORM\Entity(repositoryClass: StudentRepository::class)]
#[Vich\Uploadable]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:student']],
    denormalizationContext: ['groups' => ['write:student']],
    operations: [
        new Api\Get(
        ),
        new Api\GetCollection(),
        new Api\Post(
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Api\Delete(
            security: 'is_granted("ROLE_ADMIN")'
        ),
        new Api\Patch(
            security: 'is_granted("ROLE_ADMIN") or object.getUser().getId() == user.getId()',
            denormalizationContext: ['groups' => ['write:student:patch']],
            normalizationContext: ['groups' => ['read:student:patch']],
        ),
        new Api\Put(
            security: 'is_granted("ROLE_ADMIN") or object.getUser().getId() == user.getId()'
        ),
        new Api\Get(
            uriTemplate: '/students/{id}/generate-pdf/{docType}',
            security: 'is_granted("ROLE_ADMIN")',
            controller: StudentPdfGeneratorAction::class,
            read: false,
            openapiContext: [
                'summary' => 'Generate a PDF file for a student',
            ],
        ),
        new Api\Post(
            uriTemplate: '/api/students/{id}/generate-pdf/{docType}',
            security: 'is_granted("ROLE_ADMIN")',
            controller: StudentPdfGeneratorAction::class,
            openapiContext: [
                'summary' => 'Generate a PDF file for a student',
            ],
        ),
        new Api\Get(
            uriTemplate: '/api/students/{id}/generate-pdf/{docType}',
            security: 'is_granted("ROLE_ADMIN") or object.getUser().getId() == user.getId()',
            openapiContext: [
                'summary' => 'Get a PDF file for a student',
            ],
        ),
        new Api\Get(
            uriTemplate: '/api/students/{id}/generate-pdf/{docType}/download',
            security: 'is_granted("ROLE_ADMIN") or object.getUser().getId() == user.getId()',
            openapiContext: [
                'summary' => 'Download a PDF file for a student',
            ],
        ),
        new Api\Post(
            controller: StudentImageController::class,
            deserialize: false,
            uriTemplate: '/students/{id}/image',
            security: 'is_granted("ROLE_USER")',
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ])
                )
            )
        ),
    ]
)]
#[Api\ApiFilter(SearchFilter::class, properties: ['lastname' => 'ipartial'])]
#[Api\ApiFilter(OrderFilter::class, properties: ['id', 'lastname'], arguments: ['orderParameterName' => 'order'])]
#[Api\ApiFilter(SearchFilter::class, properties: ['user.lastname' => 'ipartial', 'user.firstname' => 'ipartial', 'promotion' => 'exact'])]
#[UniqueEntity(
    fields: ['phoneNumber'],
    message: 'Ce numéro de téléphone est déjà enregistré.'
)]
#[UniqueEntity(
    fields: ['socialSecurityNumber'],
    message: 'Ce numéro de sécurité sociale existe déjà.'
)]
class Student
{
    public bool $needToSendWelcomeEmail = false;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'read:student',
        'read_user',
        'read:Promotion',
        'read:grade',
         ])]
    private ?int $id = null;

    #[ORM\OneToOne(inversedBy: 'student', targetEntity: User::class, cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups([
        'read:student',
        'write:student',
        'read:advice',
        'read:Promotion',
        'read:student:patch',
        'write:student:patch',
        'read:grade',
        'read: studentGrades',
        ])]
    private ?User $user = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'read:student',
        'write:student',
        'read_user',
        'write:student:patch',
        'read:student:patch',
        ])]
    #[Assert\NotBlank(message: 'L\'adresse est obligatoire.')]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'read:student',
        'write:student',
        'read_user',
        'write:student:patch',
        'read:student:patch',
        ])]
    #[Assert\NotBlank(message: 'Le code postal est obligatoire.')]
    private ?string $zipcode = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'read:student',
        'write:student',
        'read_user',
        'write:student:patch',
        'read:student:patch',
        ])]
    #[Assert\NotBlank(message: 'La ville est obligatoire.')]
    private ?string $city = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Assert\Length(
        min: 10,
        max: 10,
        minMessage: 'Merci de saisir un numero de téléphone valide.',
        maxMessage: 'Merci de saisir un numero de téléphone valide.'
    )]
    #[Assert\Regex(
        pattern: '/^0[1-9]\d{8}$/',
        message: 'Le numéro de téléphone doit contenir uniquement des chiffres.'
    )]
    #[Groups([
        'read:student',
        'write:student',
        'read_user',
        'write:student:patch',
        'read:student:patch',
        ])]
    #[Assert\NotBlank]
    private ?string $phoneNumber = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups([
        'read:student',
        'write:student',
        'write:student:patch',
        'read:student:patch',
        ])]
    #[Assert\NotBlank(message: 'La date de naissance est obligatoire.')]
    private ?\DateTimeInterface $dateOfBirth = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups([
        'write:student',
        'read:student',
        'write:student:patch',
        'read:student:patch',
        ])]
    #[Assert\Regex(
        pattern: '/^[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}([0-9]{2})$/',
        message: 'Le numéro de sécurité sociale doit commencer par 1 ou 2 et contenir 15 chiffres.'
    )]
    #[Assert\Length(
        min: 15,
        max: 15,
        minMessage: 'Le numéro de sécurité sociale doit contenir 15 chiffres.',
        maxMessage: 'Le numéro de sécurité sociale doit contenir 15 chiffres.'
    )]
    #[Assert\NotBlank(message: 'Le numéro de sécurité sociale est obligatoire.')]
    private ?string $socialSecurityNumber = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups([
        'write:student',
        'read:student',
        'write:student:patch',
        'read:student:patch',
        ])]
    private ?\DateTimeInterface $dateOfExpulsion = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups([
        'write:student',
        'read:student',
        'write:student:patch',
        'read:student:patch',
        ])]
    private ?\DateTimeInterface $dateOfDropout = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups([
        'write:student',
        'read:student',
        'write:student:patch',
        'read:student:patch',
        ])]
    private ?string $funding = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Le sexe est obligatoire.')]
    #[Groups([
        'write:student',
        'read:student',
        'write:student:patch',
        'read:student:patch',
        ])]
    private ?string $gender = null;

    #[ORM\ManyToOne(targetEntity: Promotion::class, inversedBy: 'students')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups([
        'write:student',
        'read:student',
        'write:student:patch',
        'read:student:patch',
        ])]
    private ?Promotion $promotion = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'write:student',
        'read:student',
        'write:student:patch',
        'read:student:patch',
        ])]
    private ?string $state = null;

    /**
     * @var Collection<int, Advice>
     */
    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Advice::class, orphanRemoval: true)]
    private Collection $advice;

    /**
     * @var Collection<int, AttendanceStudent>
     */
    #[ORM\OneToMany(mappedBy: 'student', targetEntity: AttendanceStudent::class)]
    private Collection $attendanceStudents;

    /**
     * @var Collection<int, StudentFile>
     */
    #[ORM\OneToMany(mappedBy: 'student', targetEntity: StudentFile::class, orphanRemoval: true)]
    #[Groups([
        'read:student',
        'write:admin',
    ])]
    private Collection $studentFiles;

    #[ORM\OneToMany(mappedBy: 'student', targetEntity: Grade::class)]
    #[Groups([
        'read:student',
        ])]
    private Collection $grades;

    #[UploadableField(mapping: 'student_image', fileNameProperty: 'filePath')]
    // #[Assert\Image(
    //     mimeTypes: ['image/jpeg', 'image/png'],
    //     mimeTypesMessage: 'Le fichier doit être au format jpeg ou png.'
    // )]
    private ?File $file;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups([
        'read:student',
        'read_user',
        'read:student:patch',
    ])]
    private ?string $filePath = null;

    #[Groups(['read:student'])]
    private ?string $fileUrl = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->advice = new ArrayCollection();
        $this->attendanceStudents = new ArrayCollection();
        $this->studentFiles = new ArrayCollection();
        $this->grades = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): static
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(?\DateTimeInterface $dateOfBirth): static
    {
        $this->dateOfBirth = $dateOfBirth;

        return $this;
    }

    public function getSocialSecurityNumber(): ?string
    {
        return $this->socialSecurityNumber;
    }

    public function setSocialSecurityNumber(string $socialSecurityNumber): static
    {
        $this->socialSecurityNumber = $socialSecurityNumber;

        return $this;
    }

    #[Groups(['read:student'])]
    public function getPromotionId(): ?int
    {
        if ($this->promotion instanceof Promotion) {
            return $this->promotion->getId();
        }

        return null;
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

    public function getDateOfExpulsion(): ?\DateTimeInterface
    {
        return $this->dateOfExpulsion;
    }

    public function setDateOfExpulsion(?\DateTimeInterface $dateOfExpulsion): static
    {
        $this->dateOfExpulsion = $dateOfExpulsion;

        return $this;
    }

    public function getDateOfDropout(): ?\DateTimeInterface
    {
        return $this->dateOfDropout;
    }

    public function setDateOfDropout(?\DateTimeInterface $dateOfDropout): static
    {
        $this->dateOfDropout = $dateOfDropout;

        return $this;
    }

    public function getFunding(): ?string
    {
        return $this->funding;
    }

    public function setFunding(?string $funding): static
    {
        $this->funding = $funding;

        return $this;
    }

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): static
    {
        $this->gender = $gender;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): static
    {
        $this->state = $state;

        return $this;
    }

    /**
     * @return Collection<int, Advice>
     */
    public function getAdvice(): Collection
    {
        return $this->advice;
    }

    public function addAdvice(Advice $advice): static
    {
        if (!$this->advice->contains($advice)) {
            $this->advice->add($advice);
            $advice->setStudent($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, AttendanceStudent>
     */
    public function getAttendanceStudents(): Collection
    {
        return $this->attendanceStudents;
    }

    public function addAttendanceStudent(AttendanceStudent $attendanceStudent): static
    {
        if (!$this->attendanceStudents->contains($attendanceStudent)) {
            $this->attendanceStudents->add($attendanceStudent);
            $attendanceStudent->setStudent($this);
        }

        return $this;
    }

    public function removeAdvice(Advice $advice): static
    {
        // set the owning side to null (unless already changed)
        if ($this->advice->removeElement($advice) && $advice->getStudent() === $this) {
            $advice->setStudent(null);
        }

        return $this;
    }

    public function removeAttendanceStudent(AttendanceStudent $attendanceStudent): static
    {
        // set the owning side to null (unless already changed)
        if ($this->attendanceStudents->removeElement($attendanceStudent) && $attendanceStudent->getStudent() === $this) {
            $attendanceStudent->setStudent(null);
        }

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
            $grade->setStudent($this);
        }

        return $this;
    }

    private ?string $folder = null;

    /**
     * @return string|null
     */
    public function getFolder()
    {
        return $this->folder;
    }

    /**
     * @return string|null
     */
    public function getFullname()
    {
        return $this->getUser()?->getFirstname().' '.$this->getUser()?->getLastname();
    }

    /**
     * @return Collection<int, StudentFile>
     */
    public function getStudentFiles(): Collection
    {
        return $this->studentFiles;
    }

    public function addStudentFile(StudentFile $studentFile): static
    {
        if (!$this->studentFiles->contains($studentFile)) {
            $this->studentFiles->add($studentFile);
            $studentFile->setStudent($this);
        }

        return $this;
    }

    public function removeStudentFile(StudentFile $studentFile): static
    {
        // set the owning side to null (unless already changed)
        if ($this->studentFiles->removeElement($studentFile) && $studentFile->getStudent() === $this) {
            $studentFile->setStudent(null);
        }

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(File $file = null): static
    {
        $this->file = $file;
        if (null !== $file) {
            $this->updatedAt = new \DateTimeImmutable();
        }

        return $this;
    }

    public function getFileUrl(): ?string
    {
        return $this->fileUrl;
    }

    public function setFileUrl(?string $fileUrl): static
    {
        $this->fileUrl = $fileUrl;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(?string $filePath): static
    {
        $this->filePath = $filePath;

        return $this;
    }
}
