<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Advice;
use App\Entity\Student;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Advice>
 *
 * @method Advice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Advice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Advice[]    findAll()
 * @method Advice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AdviceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Advice::class);
    }

    public function hasSubmittedThisWeek(Student $student): bool
    {
        $startOfWeek = new \DateTime('monday this week');
        $endOfWeek = new \DateTime('sunday this week');

        $query = $this->createQueryBuilder('a')
            ->where('a.student = :student')
            ->andWhere('a.date BETWEEN :start AND :end')
            ->setParameter('student', $student)
            ->setParameter('start', $startOfWeek)
            ->setParameter('end', $endOfWeek)
            ->getQuery();

        $result = $query->getResult();
        if (!is_array($result) && !($result instanceof \Countable)) {
            return false;
        }

        return count($result) > 0;
    }

    //    /**
    //     * @return Advice[] Returns an array of Advice objects
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

    //    public function findOneBySomeField($value): ?Advice
    //    {
    //        return $this->createQueryBuilder('a')
    //            ->andWhere('a.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
