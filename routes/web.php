<?php

use App\Http\Controllers\SpaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| API routes live under /api. Everything else is handled by the React SPA
| built into public/frontend and served through SpaController.
|
*/

Route::get('/test', function () {
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://www.filimo.com/m/p83k7');
    $response = str_replace(array("\r\n", "\n\r", "\r", "\n"), '', $response->getBody());
    preg_match('/movie\.nameFa.*?=.*?"(.*?)";/', $response, $match);

    if (!isset($match[1])) {
        dd("\nSorry! Not found any video with this ID.\n");
    }

    $title = $match[1];
    echo "Title: $title\n";

    preg_match('/movie\.totalDuration.*?=.*?"(.*?)";/', $response, $match);
    $duration = round($match[1] % 60);
    echo "Duration: $duration min\n";

    preg_match('/movie\.filimoRate.*?=.*?"(.*?)";/', $response, $match);
    $rate = @$match[1];
    if ($rate) echo "Rate: $rate%\n";

    $video = $client->get('https://www.filimo.com/w/p83k7');

    preg_match('/var player_data.*?=(.*?);if\(/', $video->getBody(), $match);
    $match = end($match);
    $match = json_decode($match);
    $subtitle = @$match->tracks[0]->src;

    foreach (@$match->multiSRC as $objecturl) {
        if ($objecturl[0]->type == 'application/vnd.apple.mpegurl') {
            $video_url = $objecturl[0]->src;
            break;
        }
    }

    if (!$video_url) {
        die("Error: Can not fetch video URL.\n");
    }

    $videoContent = $client->get($video_url);

    preg_match_all('/#((?:[0-9])+(?:p|k)+)\n(?:.*)BANDWIDTH=(.*),RESOLUTION=(.*)\n(.*)/', $videoContent->getBody(), $matches);

    $qualities = array();
    foreach ($matches[1] as $key => $value) {
        $qualities[] = array(
            'quality' => $matches[1][$key],
            'bandwidth' => $matches[2][$key],
            'resolution' => $matches[3][$key],
            'url' => $matches[4][$key],
        );
    }

    $qualities = array_combine(range(1, count($qualities)), array_values($qualities));
    foreach ($qualities as $key => $value) {
        echo $key . ") QUALITY=" . $value['quality'] . " - BANDWIDTH=" . $value['bandwidth'] . " - RESOLUTION=" . $value['resolution'] . "\n";
    }

    $cmd_audio = '';
    preg_match_all('/#EXT-X-MEDIA:TYPE=AUDIO.*?LANGUAGE="(.*?)".*?URI="(.*?)"/', $videoContent->getBody(), $audios, PREG_SET_ORDER, 0);
    if ($audios) {
        dd($audios);
        echo "Select Audio:\n";
        foreach ($audios as $key => $value) {
            echo $key + 1 . ") LANGUAGE = " . $value[1] . "\n";
        }
        echo "Input option number: ";
    }

    $video_file = 'sedato-seasson_2_section_1.mp4';
    $cmd = 'ffmpeg ' . ' -i "' . $qualities[5]['url'] . '"' . $cmd_audio . ' -c:v copy -c:a copy -bsf:a aac_adtstoasc -y "' . $video_file . '"';

    shell_exec($cmd . '</dev/null >/dev/null 2>"' . 'log2.text' . '" &');

    return 'ok';
});

// React SPA (built into public/frontend). Static /frontend/* assets are served
// directly by the web server from the public directory.
Route::get('/{any?}', SpaController::class)->where('any', '.*');
