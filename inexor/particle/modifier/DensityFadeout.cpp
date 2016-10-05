/*
 * DensityFadeout.cpp
 *
 *  Created on: 28.01.2015
 *      Author: aschaeffer
 */

#include "DensityFadeout.hpp"

namespace inexor {
namespace entity {
namespace particle {

    DensityFadeout::DensityFadeout() : EntityFunction(MODIFIER_DENSITY_FADEOUT_FUNCTION)
    {
    }

    DensityFadeout::~DensityFadeout()
    {
    }

    AttributeRefPtr DensityFadeout::Execute(TimeStep time_step, std::shared_ptr<EntityInstance> modifier, std::shared_ptr<EntityInstance> particle)
    {
        float percent_done = (*particle)[ELAPSED]->intVal / ((*particle)[REMAINING]->intVal + (*particle)[ELAPSED]->intVal);
        if (percent_done > (*modifier)["density_threshold"]->floatVal)
        {
            (*particle)[DENSITY]->floatVal *= (1.0f - percent_done) * 10.0f * ((float) time_step.time_factor) * ((float) (*particle)["fadeout_frames"]->intVal);
        }
        return true;
    }

}
}
}