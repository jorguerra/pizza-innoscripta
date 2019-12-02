<?php

namespace App\Http\Controllers;

use App\Order;
use App\Pizza;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Auth::user()->admin ?
            Order::with('user', 'pizzas')->orderBy('created_at', 'desc')->paginate() :
            Auth::user()->orders()->with('pizzas')->orderBy('created_at', 'desc')->paginate()
        ;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if($request->name != Auth::user()->name){
            Auth::user()->update(['name' => $request->name]);
        }
        $order = $request->order;
        $order['user_id'] = Auth::user()->id;
        $newOrder = Order::create($order);
        $pizzas = [];
        $order_id = $newOrder->id;
        foreach($request->pizzas as $pizza_id => $quantity)
        {
            $price = Pizza::find($pizza_id)->price;
            $pizzas []= compact('order_id', 'pizza_id', 'quantity', 'price');
        }
        DB::table('pizza_order')->insert($pizzas);
        Session::put('success', 'Your order has been processed');
        return redirect('/');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
