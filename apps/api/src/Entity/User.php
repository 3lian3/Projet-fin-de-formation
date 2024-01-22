<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata as Api;
use ApiPlatform\OpenApi\Model;
use App\Controller\AskResetPasswordAction;
use App\Controller\MeAction;
use App\Controller\ResetPasswordAction;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read_user']],
    denormalizationContext: ['groups' => ['write_user']],
    // security: 'is_granted("ROLE_ADMIN")',
    operations: [
        new Api\GetCollection(),
        new Api\Post(),
        new Api\Get(),
        new Api\Get(
            uriTemplate: '/me',
            controller: MeAction::class,
            read: false,
            security: 'is_granted("ROLE_STUDENT")',
            openapi: new Model\Operation(
                summary: 'Show current user profile'
            )
        ),
        new Api\Post(
            uriTemplate: '/users/{hash}/reset-password',
            controller: ResetPasswordAction::class,
            read: false,
            denormalizationContext: ['groups' => ['write:resetPassword']],
            openapi: new Model\Operation(
                summary: 'Reset user password form'
            )
        ),
        new Api\Post(
            uriTemplate: '/users/ask-reset-password',
            controller: AskResetPasswordAction::class,
            read: false,
            denormalizationContext: ['groups' => ['write:askResetPassword']],
            openapi: new Model\Operation(
                summary: 'Ask reset user password'
            )
        ),
        new Api\Put(),
    ]
)]
#[Api\ApiFilter(SearchFilter::class, properties: ['email' => 'ipartial'])]
#[Api\ApiFilter(OrderFilter::class, properties: ['id', 'email'], arguments: ['orderParameterName' => 'order'])]
#[UniqueEntity(
    fields: ['email'],
    message: 'Cet email est déjà utilisé.'
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups([
        'read_user',
        'read:student',
        'read:advice',
        'read:attendanceStudent',
        'read:attendanceTeacher',
        'read:Promotion',
    ])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups([
        'read_user',
        'write_user',
        'read:Promotion',
        'read:student',
        'write:student',
        'write:askResetPassword',
        'write:student:patch',
        'read:student:patch',
    ])]
    #[Assert\NotBlank]
    #[Assert\Email(message: 'Veuillez saisir un email valide.')]
    private ?string $email = null;

    /**
     * @var string[] $roles
     */
    #[ORM\Column]
    #[Groups([
        'read_user',
        'write_user',
        'read:attdendanceTeacher',
        'read:student',
        'read:attendanceStudent',
    ])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups([
        'write_user',
        'write:student',
        'read:resetPassword',
    ])]
    private ?string $password = null;

    #[Groups([
        'write:resetPassword',
    ])]
    #[Assert\Regex(
        pattern: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/',
        message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.'
    )]
    #[Assert\NotCompromisedPassword()]
    private ?string $plainPassword = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'read_user',
        'write_user',
        'write:student',
        'read:student',
        'read:advice',
        'read:attendanceStudent',
        'read:Promotion',
        'write:student:patch',
        'read:student:patch',
        'read:grade',
        'read:studentGrades',
    ])]
    #[Assert\NotBlank]
    private ?string $lastname = null;

    #[ORM\Column(length: 255)]
    #[Groups([
        'read_user',
        'write_user',
        'read:student',
        'write:student',
        'read:advice',
        'read:attendanceStudent',
        'read:Promotion',
        'write:student:patch',
        'read:student:patch',
        'read:grade',
        'read:studentGrades',
    ])]
    #[Assert\NotBlank]
    private ?string $firstname = null;

    /**
     * @var Student|null
     */
    #[ORM\OneToOne(mappedBy: 'user', targetEntity: Student::class, cascade: ['persist'])]
    #[Groups(['read_user'])]
    private $student;

    /**
     * @var Collection<int, AttendanceTeacher>
     */
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: AttendanceTeacher::class)]
    private Collection $attendanceTeachers;

    public function __construct()
    {
        $this->attendanceTeachers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param string[] $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    #[Groups(['read_user'])]
    public function getStudent(): ?Student
    {
        return $this->student;
    }

    public function setStudent(?Student $student): self
    {
        $this->student = $student;

        return $this;
    }

    /**
     * @return Collection<int, AttendanceTeacher>
     */
    public function getAttendanceTeachers(): Collection
    {
        return $this->attendanceTeachers;
    }

    public function addAttendanceTeacher(AttendanceTeacher $attendanceTeacher): self
    {
        if (!$this->attendanceTeachers->contains($attendanceTeacher)) {
            $this->attendanceTeachers[] = $attendanceTeacher;
            $attendanceTeacher->setUser($this);
        }

        return $this;
    }

    public function removeAttendanceTeacher(AttendanceTeacher $attendanceTeacher): self
    {
        // set the owning side to null (unless already changed)
        if ($this->attendanceTeachers->removeElement($attendanceTeacher) && $attendanceTeacher->getUser() === $this) {
            $attendanceTeacher->setUser(null);
        }

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): static
    {
        $this->plainPassword = $plainPassword;

        // be sure doctrine events works
        $this->setUpdatedAt(new \DateTime());

        return $this;
    }
}
