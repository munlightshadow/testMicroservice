<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Jobs\TestJob;



class TestController extends Controller
{
    public function newJob()
    {
        TestJob::dispatch('+++');

        die('done');
    }
}
