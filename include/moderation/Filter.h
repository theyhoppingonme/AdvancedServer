#ifndef FILTER_MODER_H
#define FILTER_MODER_H

#include <cJSON.h>
#include <io/Threads.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdbool.h>

#define NICKNAME_FILTER_FILE "NicknameFilter.json"

extern cJSON* g_banned_nicknames;

bool init_filter(void);

#endif
