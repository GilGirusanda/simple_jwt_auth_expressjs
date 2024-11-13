import { Model, DataTypes } from "@sequelize/core";
import { 
    Attribute,
    PrimaryKey, 
    AutoIncrement, 
    NotNull,
    Default 
} from '@sequelize/core/decorators-legacy';
import { getRandomId } from "../../utils/generate.random.js";

export default class User extends Model {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id;

    @Attribute({
        type: DataTypes.STRING,
        unique: true
    })
    @NotNull
    @Default(() => 'user'+getRandomId())
    name;

    @Attribute({
        type: DataTypes.STRING,
        validate: {
            len: [0,72]
        }
    })
    @NotNull
    passwordHash;
} 
