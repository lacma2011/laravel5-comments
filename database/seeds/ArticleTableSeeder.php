<?php

use Illuminate\Database\Seeder;

class ArticleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $id = DB::connection('mysql')->table('article')->insertGetId([]);

        DB::connection('mysql')->table('comment')->insertGetId([
            'article_id' => $id,
            'name' => 'Janet',
            'comment' => 'First Comment',
        ]);

        DB::connection('mysql')->table('comment')->insertGetId([
            'article_id' => $id,
            'name' => 'John',
            'comment' => 'Second Comment',
        ]);


    }
}
