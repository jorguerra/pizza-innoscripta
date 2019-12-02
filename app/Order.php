<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['street_line1', 'street_line2', 'zip_code', 'mobile_phone', 'user_id'];

    protected $appends = ['amount'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getAmountAttribute()
    {
        $amount = 0;
        foreach($this->pizzas()->withPivot('quantity')->get() as $pizza){
            $amount += $pizza->price * $pizza->pivot->quantity;
        }
        return number_format($amount,2);
    }

    public function pizzas()
    {
        return $this->belongsToMany(Pizza::class, 'pizza_order');
    }

}
