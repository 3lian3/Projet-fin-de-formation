<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\AttendanceStudent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AttendanceStudent>
 *
 * @method AttendanceStudent|null find($id, $lockMode = null, $lockVersion = null)
 * @method AttendanceStudent|null findOneBy(array $criteria, array $orderBy = null)
 * @method AttendanceStudent[]    findAll()
 * @method AttendanceStudent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AttendanceStudentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AttendanceStudent::class);
    }

    /**
     * @return array<array{attendanceDate: \DateTimeInterface, presentStudentsCount: int}>
     *                                                                                     Returns an array of attendance summaries
     */
    public function getAttendanceSummary(): array
    {
        $qb = $this->createQueryBuilder('a')
            ->select('a.date AS attendanceDate, COUNT(DISTINCT a.student) AS presentStudentsCount')
            ->groupBy('a.date')
            ->orderBy('a.date', 'ASC');

        $result = $qb->getQuery()->getResult();

        return is_array($result) ? $result : [];
    }

    /**
     * @return string[] Returns an array of student names
     */
    public function findAbsentStudents(\DateTime $date, int|string $promotionId): array
    {
        $qb = $this->getEntityManager()->createQueryBuilder();

        $qb->select('u.id', 'u.firstname', 'u.lastname')
            ->from('App\Entity\Student', 's')
            ->leftJoin('s.user', 'u')
            ->leftJoin('s.attendanceStudents', 'a', 'WITH', 'a.date = :date')
            ->leftJoin('s.promotion', 'p')
            ->where($qb->expr()->isNull('a.id'))
            ->andWhere('p.id = :promotionId')
            ->setParameter('date', $date->format('Y-m-d'))
            ->setParameter('promotionId', $promotionId);

        $result = $qb->getQuery()->getResult();

        return is_array($result) ? $result : [];
    }

    /**
     * @return array<array{lessonName: string, promotionName: string, promotionId: int, teacherLastname: string, teacherFirstname: string}>
     *                                                                                                                                      Returns an array of course details
     */
    public function findCourseDetails(\DateTime $date): array
    {
        $qb = $this->getEntityManager()->createQueryBuilder();
        $qb->select('l.name as lessonName', 'p.name as promotionName', 'p.id as promotionId', 'u.lastname as teacherLastname', 'u.firstname as teacherFirstname')
            ->from('App\Entity\AttendanceTeacher', 'at')
            ->innerJoin('at.lesson', 'l')
            ->innerJoin('at.promotion', 'p')
            ->innerJoin('at.user', 'u')
            ->where('at.date = :date')
            ->setParameter('date', $date->format('Y-m-d'));

        $result = $qb->getQuery()->getResult();

        return is_array($result) ? $result : [];
    }

    /**
     * @return int Returns the count of present students
     */
    public function countPresentStudents(\DateTime $date, int|string $promotionId): int
    {
        $qb = $this->getEntityManager()->createQueryBuilder();

        $qb->select('COUNT(DISTINCT s.id)')
            ->from('App\Entity\Student', 's')
            ->leftJoin('s.user', 'u')
            ->leftJoin('s.attendanceStudents', 'a')
            ->andWhere('a.date = :date')
            ->andWhere('s.promotion = :promotionId')
            ->setParameter('date', $date->format('Y-m-d'))
            ->setParameter('promotionId', $promotionId);

        return (int) $qb->getQuery()->getSingleScalarResult();
    }
}
