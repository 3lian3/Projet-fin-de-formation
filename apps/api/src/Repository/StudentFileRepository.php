<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\StudentFile;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StudentFile>
 *
 * @method StudentFile|null find($id, $lockMode = null, $lockVersion = null)
 * @method StudentFile|null findOneBy(array $criteria, array $orderBy = null)
 * @method StudentFile[]    findAll()
 * @method StudentFile[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 * @method StudentFile[]    findByExampleField($value)
 * @method StudentFile|null findOneBySomeField($value)
 * @method StudentFile|null findOneByStudent(Student $student)
 * @method StudentFile|null findOneByStudentAndDocType(Student $student, string $docType)
 * @method StudentFile[]    findBygetfolder()
 */
class StudentFileRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StudentFile::class);
    }

    //    /**
    //     * @return StudentFile[] Returns an array of StudentFile objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('s.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?StudentFile
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
