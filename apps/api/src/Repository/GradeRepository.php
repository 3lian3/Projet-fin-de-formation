<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Grade;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Grade>
 *
 * @method Grade|null find($id, $lockMode = null, $lockVersion = null)
 * @method Grade|null findOneBy(array $criteria, array $orderBy = null)
 * @method Grade[]    findAll()
 * @method Grade[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GradeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Grade::class);
    }

    /**
     * @return array<array{gradeId: int, date: \DateTimeInterface, grade: int, appreciation: string}>
     *                                                                                                Returns an array of grades
     */
    public function findGradesByStudent(int $studentId): array
    {
        $qb = $this->createQueryBuilder('g')
            ->andWhere('g.student = :studentId')
            ->setParameter('studentId', $studentId)
            ->orderBy('g.date', 'ASC');

        $result = $qb->getQuery()->getResult();

        return is_array($result) ? $result : [];
    }

    /**
     * @return array<array{gradeId: int, date: \DateTimeInterface, grade: int, appreciation: string, firstname: string, lastname: string, examName: string}>
     *                                                                                                                                                       Returns an array of grades
     */
    public function findGradesByPromotion(int $promotionId): array
    {
        $qb = $this->createQueryBuilder('g')
            ->innerJoin('g.student', 's')
            ->innerJoin('s.user', 'u')
            ->innerJoin('s.promotion', 'p')
            ->innerJoin('g.exam', 'e')
            ->where('p.id = :promotionId')
            ->setParameter('promotionId', $promotionId)
            ->select(
                'g.id as gradeId',
                'g.date',
                'g.grade',
                'g.appreciation',
                'u.firstname',
                'u.lastname',
                'e.name as examName'
            );

        $result = $qb->getQuery()->getResult();

        return is_array($result) ? $result : [];
    }
}
