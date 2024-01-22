<?php

declare(strict_types=1);

namespace App\ApiResource;

use ApiPlatform\Metadata as Api;
use App\Controller\AttendanceSummaryController;

#[Api\ApiResource(
    normalizationContext: ['groups' => ['read:attendanceSummary']],
    uriTemplate: '/attendance-summary',
    shortName: 'Attendance-summary',
    controller: AttendanceSummaryController::class,
    operations: [new Api\Get(
        // security: 'is_granted("ROLE_ADMIN")'
    )],
)]
class AttendanceSummary
{
}
