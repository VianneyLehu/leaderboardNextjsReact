const mongoose = require('mongoose')
import summonerSchema from '@/lib/models/summoner'

// Connect to the database
export default async function connectDb(){
    mongoose.set('strictQuery', true);

    mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function() {
        console.log('-------- Connected to the database --------');
    });

    const Summoner = mongoose.model('Summoner', summonerSchema)
}

