/**
 * md5
 * Created by jszh on 2018/08/22.
 */

import {hex_md5} from 'crypto/md5';
import {hex_sha1} from 'crypto/sha1';

export {toMD5,sha1}

function toMD5(str)
{
    return hex_md5(str);
};

function sha1(str){
    return hex_sha1(str)
}