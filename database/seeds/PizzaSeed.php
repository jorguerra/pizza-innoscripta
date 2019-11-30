<?php

use App\Pizza;
use Illuminate\Database\Seeder;

class PizzaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = [null, 
            'Italian Pizza', 
            'Greek Pizza', 
            'Caucasian Pizza', 
            'American Pizza', 
            'Bacon Crispy Thins',
            'Hawaiian Special',
            'Ultimate Overload',
            'Bacon Pizza',
        ];

        for($i = 1 ; $i < 8; $i++)
        {
            $data = [
                'name' => $names[$i],
                'photo' => "/images/pizza-{$i}.jpg",
                'price' => rand(7,20) + rand(1,99)/100,
                'description' => "{$names[$i]} is a gorgeous pizza"
            ];
            Pizza::create($data);
        }
    }
}
