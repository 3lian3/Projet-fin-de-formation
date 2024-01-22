<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata as Api;
use App\Controller\StudentPdfDownloadAction;
use App\Repository\StudentFileRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StudentFileRepository::class)]
#[Api\ApiResource(
    operations: [
        new Api\Get(),
        new Api\GetCollection(),
        new Api\Get(
            uriTemplate: '/student_files/{id}/download',
            security: 'is_granted("ROLE_ADMIN") or object.student.user.getId() == user.getId()',
            openapiContext: [
                'summary' => 'Download a PDF file for a student',
            ],
            controller: StudentPdfDownloadAction::class,
        ),
    ]
)]
#[Api\ApiFilter(SearchFilter::class, properties: ['student' => 'exact'])]
class StudentFile
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'studentFiles')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Student $student = null;

    #[ORM\Column(length: 255)]
    private ?string $path = null;

    private ?string $docType = null;

    public function setDocType(?string $docType): void
    {
        $this->docType = $docType;
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPath(): ?string
    {
        if ('example' === $this->docType) {
            return '/example/path';
        }

        return $this->path;
    }

    public function setPath(string $path): static
    {
        $this->path = $path;

        return $this;
    }
}
