<?php

namespace config\database\migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $tableName = config('links.tables.links');

        Schema::create($tableName, function (Blueprint $table) {
            $table->increments('id');
            $table->string('url');
            $table->text('data');
            $table->dateTime('expiry')->nullable();
            $table->integer('click_limit')->nullable();
            $table->integer('clicks')->default(0);
            $table->uuid('uuid');
            $table->unsignedInteger('group_id')->nullable();
            $table->timestamps();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $tableName = config('links.tables.links');

        Schema::drop($tableName);
    }
}
