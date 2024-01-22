<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\AttendanceTeacher;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<AttendanceTeacher>
 *
 * @method AttendanceTeacher|null find($id, $lockMode = null, $lockVersion = null)
 * @method AttendanceTeacher|null findOneBy(array $criteria, array $orderBy = null)
 * @method AttendanceTeacher[]    findAll()
 * @method AttendanceTeacher[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AttendanceTeacherRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AttendanceTeacher::class);
    }

    //    /**
    //     * @return AttendanceTeacher[] Returns an array of AttendanceTeacher objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('a.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?AttendanceTeacher
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
