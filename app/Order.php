<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['street_line1', 'street_line2', 'zip_code', 'mobile_phone'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pizzas()
    {
        return $this->belongsToMany(Pizza::class, 'pizza_order');
    }

}
