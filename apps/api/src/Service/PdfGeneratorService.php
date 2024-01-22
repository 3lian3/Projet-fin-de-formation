<?php

declare(strict_types=1);

namespace App\Service;

use Dompdf\Dompdf;
use Dompdf\Options;
use Twig\Environment;

class PdfGeneratorService
{
    public function __construct(private Environment $twig)
    {
    }

    /**
     * @param mixed[] $inputData
     */
    public function generate(string $document, array $inputData): ?string
    {
        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'Arial');
        $pdfOptions->set('isRemoteEnabled', true);
        $pdfOptions->set('isHtml5ParserEnabled', true);
        $pdfOptions->set('isPhpEnabled', true);
        $pdfOptions->set('defaultMediaType', 'all');
        $pdfOptions->set('isFontSubsettingEnabled', true);

        $dompdf = new Dompdf($pdfOptions);
        $dompdf->setHttpContext(stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ],
        ]));

        $dompdf->loadHtml($this->twig->render(
            'pdfdoc/'.$document.'.html.twig',
            $inputData
        ));

        $dompdf->setPaper('A4', 'portrait');

        $dompdf->render();

        return $dompdf->output();
    }
}
