<?php

declare(strict_types=1);

namespace App\Controller;

use App\DTO\AttendanceSummaryDTO;
use App\Repository\AttendanceStudentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AttendanceSummaryController extends AbstractController
{
    private AttendanceStudentRepository $attendanceStudentRepository;

    public function __construct(AttendanceStudentRepository $attendanceStudentRepository)
    {
        $this->attendanceStudentRepository = $attendanceStudentRepository;
    }

    #[Route('/attendance-summary', name: 'attendance_summary')]
    public function __invoke(): Response
    {
        $attendanceSummary = $this->attendanceStudentRepository->getAttendanceSummary();
        $responseDTOs = [];

        foreach ($attendanceSummary as $dateSummary) {
            $date = new \DateTime($dateSummary['attendanceDate']->format('Y-m-d'));
            $courseDetails = $this->attendanceStudentRepository->findCourseDetails($date);
            $promotionId = $courseDetails[0]['promotionId'] ?? 0;
            $absentStudentsNames = $this->attendanceStudentRepository->findAbsentStudents($date, $promotionId);
            $teacherFullName = isset($courseDetails[0]) ? $courseDetails[0]['teacherFirstname'].' '.$courseDetails[0]['teacherLastname'] : '';
            $presentStudentsCount = $this->attendanceStudentRepository->countPresentStudents($date, $promotionId);
            $summaryDTO = new AttendanceSummaryDTO(
                $date->format('Y-m-d'),
                $courseDetails[0]['lessonName'] ?? '',
                $courseDetails[0]['promotionName'] ?? '',
                $promotionId,
                $teacherFullName,
                $presentStudentsCount,
                $absentStudentsNames
            );
            $responseDTOs[] = $summaryDTO;
        }

        return $this->json(['data' => $responseDTOs]);
    }
}
