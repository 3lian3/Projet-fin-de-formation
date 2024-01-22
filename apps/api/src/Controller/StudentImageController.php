<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Student;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class StudentImageController
{
    public function __invoke(Request $request): Student
    {
        $student = $request->attributes->get('data');
        if (!$student instanceof Student) {
            throw new \RuntimeException('Student not found');
        }

        /** @var File|null $file */
        $file = $request->files->get('file');

        if ($file instanceof File) {
            $student->setFile($file);
        } else {
            throw new \RuntimeException('File not found');
        }
        $student->setUpdatedAt(new \DateTimeImmutable());

        return $student;
    }
}
