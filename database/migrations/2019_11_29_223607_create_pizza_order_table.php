<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePizzaOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pizza_order', function (Blueprint $table) {
            $table->bigInteger('order_id')->unsigned();
            $table->bigInteger('pizza_id')->unsigned();
            $table->foreign('order_id')->on('orders')->references('id');
            $table->foreign('pizza_id')->on('pizzas')->references('id');
            $table->primary(['order_id', 'pizza_id']);
            $table->smallInteger('quantity');
            //It may change in the future
            $table->decimal('price', 4, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pizza_order');
    }
}
