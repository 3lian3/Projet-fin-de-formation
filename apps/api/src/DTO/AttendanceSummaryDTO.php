<?php

declare(strict_types=1);

namespace App\DTO;

use Symfony\Component\Serializer\Annotation\Groups;

class AttendanceSummaryDTO
{
    #[Groups(['read:attendanceSummary'])]
    public string $date;

    #[Groups(['read:attendanceSummary'])]
    public string $lesson;

    #[Groups(['read:attendanceSummary'])]
    public string $promotion;

    #[Groups(['read:attendanceSummary'])]
    public int $promotionId;

    #[Groups(['read:attendanceSummary'])]
    public string $teacher;

    #[Groups(['read:attendanceSummary'])]
    public int $presentStudentsCount;

    /**
     * @var string[] Array of absent students' names
     */
    #[Groups(['read:attendanceSummary'])]
    public array $absentStudentsNames;

    /**
     * @param string[] $absentStudentsNames Array of absent students' names
     */
    public function __construct(
        string $date,
        string $lesson,
        string $promotion,
        int $promotionId,
        string $teacher,
        int $presentStudentsCount,
        array $absentStudentsNames
    ) {
        $this->date = $date;
        $this->lesson = $lesson;
        $this->promotion = $promotion;
        $this->promotionId = $promotionId;
        $this->teacher = $teacher;
        $this->presentStudentsCount = $presentStudentsCount;
        $this->absentStudentsNames = $absentStudentsNames;
    }
}
