#include <moderation/Filter.h>
#include <Log.h>
#include <cJSON.h>
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <io/File.h>
#include <io/Dir.h>

cJSON* g_banned_nicknames = NULL;

bool init_filter(void)
{
    RAssert(collection_init(&g_banned_nicknames, NICKNAME_FILTER_FILE, "[]"));
    return true;
}
