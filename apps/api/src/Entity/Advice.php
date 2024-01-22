<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata as Api;
use App\Controller\AdviceController;
use App\Repository\AdviceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints\NotBlank;

#[ORM\Entity(repositoryClass: AdviceRepository::class)]
#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:advice']],
    denormalizationContext: ['groups' => ['write:advice']],
    operations: [
        new Api\Get(),
        new Api\GetCollection(),
        new Api\Post(
            uriTemplate: '/advices',
            controller: AdviceController::class,
            read: false,
            denormalizationContext: ['groups' => ['write:advice']],
            openapiContext: [
                'requestBody' => [
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'question1' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 1',
                                        'example' => 3,
                                    ],
                                    'question2' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 2',
                                        'example' => 4,
                                    ],
                                    'question3' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 3',
                                        'example' => 5,
                                    ],
                                    'question4' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 4',
                                        'example' => 4,
                                    ],
                                    'question5' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 5',
                                        'example' => 4,
                                    ],
                                    'feedback' => [
                                        'type' => 'string',
                                        'description' => 'Feedback',
                                        'example' => 'Très bonne semaine !',
                                    ],
                                ],
                                'required' => ['question1', 'question2', 'question3', 'question4', 'question5'],
                            ],
                        ],
                    ],
                ],
            ],
        ),
        new Api\Post(
            uriTemplate: '/submit-advice',
            controller: AdviceController::class,
            read: false,
            denormalizationContext: ['groups' => ['write:advice']],
            openapiContext: [
                'requestBody' => [
                    'content' => [
                        'application/json' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'question1' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 1',
                                        'example' => 3,
                                    ],
                                    'question2' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 2',
                                        'example' => 4,
                                    ],
                                    'question3' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 3',
                                        'example' => 5,
                                    ],
                                    'question4' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 4',
                                        'example' => 4,
                                    ],
                                    'question5' => [
                                        'type' => 'integer',
                                        'description' => 'Note de la question 5',
                                        'example' => 4,
                                    ],
                                    'feedback' => [
                                        'type' => 'string',
                                        'description' => 'Feedback',
                                        'example' => 'Très bonne semaine !',
                                    ],
                                ],
                                'required' => ['question1', 'question2', 'question3', 'question4', 'question5'],
                            ],
                        ],
                    ],
                ],
            ],
        ),
        new Api\Put(),
        new Api\Delete(),
        new Api\Patch(),
    ]
)]
#[Api\ApiFilter(SearchFilter::class, properties: ['student' => 'exact'])]
class Advice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['read:advice'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column]
    #[NotBlank(message: 'Veuillez répondre à cette question')]
    #[Groups(['read:advice', 'write:advice'])]
    private ?int $question1 = null;

    #[ORM\Column]
    #[NotBlank(message: 'Veuillez répondre à cette question')]
    #[Groups(['read:advice', 'write:advice'])]
    private ?int $question2 = null;

    #[ORM\Column]
    #[NotBlank(message: 'Veuillez répondre à cette question')]
    #[Groups(['read:advice', 'write:advice'])]
    private ?int $question3 = null;

    #[ORM\Column]
    #[NotBlank(message: 'Veuillez répondre à cette question')]
    #[Groups(['read:advice', 'write:advice'])]
    private ?int $question4 = null;

    #[ORM\Column]
    #[NotBlank(message: 'Veuillez répondre à cette question')]
    #[Groups(['read:advice', 'write:advice'])]
    private ?int $question5 = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['read:advice', 'write:advice'])]
    private ?string $feedback = null;

    /**
     * @var Student|null;
     */
    #[ORM\ManyToOne(inversedBy: 'advice')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read:advice'])]
    private ?Student $student = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function __construct()
    {
        $this->date = new \DateTime();
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

    public function getQuestion1(): ?int
    {
        return $this->question1;
    }

    public function setQuestion1(int $question1): static
    {
        $this->question1 = $question1;

        return $this;
    }

    public function getQuestion2(): ?int
    {
        return $this->question2;
    }

    public function setQuestion2(int $question2): static
    {
        $this->question2 = $question2;

        return $this;
    }

    public function getQuestion3(): ?int
    {
        return $this->question3;
    }

    public function setQuestion3(int $question3): static
    {
        $this->question3 = $question3;

        return $this;
    }

    public function getQuestion4(): ?int
    {
        return $this->question4;
    }

    public function setQuestion4(int $question4): static
    {
        $this->question4 = $question4;

        return $this;
    }

    public function getQuestion5(): ?int
    {
        return $this->question5;
    }

    public function setQuestion5(int $question5): static
    {
        $this->question5 = $question5;

        return $this;
    }

    public function getFeedback(): ?string
    {
        return $this->feedback;
    }

    public function setFeedback(?string $feedback): static
    {
        $this->feedback = $feedback;

        return $this;
    }

    #[Groups(['read:advice'])]
    public function getStudentId(): ?int
    {
        return $this->student instanceof Student ? $this->student->getId() : null;
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
}
